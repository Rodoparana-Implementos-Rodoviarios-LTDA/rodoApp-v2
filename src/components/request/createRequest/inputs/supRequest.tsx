import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Grid, Typography } from '@/components/ui';
import axios from 'axios';

interface Fisco {
  serialFisco: string;
  numberFisco: string;
}

interface SupplierRequestProps {
  propReceived: {
    fisco: Fisco;
    status: string;
  };
}

const SupplierRequest: React.FC<SupplierRequestProps> = ({ propReceived }) => {
  const [notesKey, setNotesKey] = useState<string>('');
  const [infosNoteXML, setInfosNoteXML] = useState<any>(null);
  const [branch, setBranch] = useState<any>(null);
  const [xmlNumber, setXmlNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const headers = [
    { text: 'CODIGO DO PRODUTO', value: 'codProduto' },
    { text: 'DESCRIÇÃO DE PRODUTO', value: 'descProduto' },
    { text: 'NCM/SH', value: 'ncmsh' },
    { text: 'CST', value: 'cst' },
    { text: 'CFOP', value: 'cfop' },
    { text: 'UN', value: 'unidade' },
    { text: 'QUANT', value: 'quantidade' },
    { text: 'V.UNITARIO', value: 'valorUnitario' },
    { text: 'V.TOTAL', value: 'valorTotal' },
    { text: 'BC.ICMS', value: 'bcIcms' },
    { text: 'V.ICMS', value: 'valorIcms' },
    { text: 'V.IPI', value: 'valorIpi' },
    { text: 'A.ICMS', value: 'aliqIcms' },
    { text: 'A.IPI', value: 'aliqIpi' },
  ];

  const showField = (field: string): boolean => {
    const statusNewRequest = (field: string, returnRequest: any) => {
      const newRequestFields = (statusDefine: string) => returnRequest[statusDefine];
      return newRequestFields(field);
    };

    const statusAndFieldValid = (statusDefine: string) => {
      const listStatus = {
        newRequest: statusNewRequest(field, { serialFisco: true, numberFisco: true, keyFisco: true }),
        confirmedRequest: statusNewRequest(field, { serialFisco: true, numberFisco: true, keyFisco: true }),
        boughtRequest: statusNewRequest(field, { serialFisco: true, numberFisco: true, keyFisco: true }),
        receivedRequest: statusNewRequest(field, { serialFisco: true, numberFisco: true, keyFisco: true }),
        Finalizado: statusNewRequest(field, { serialFisco: true, numberFisco: true, keyFisco: true }),
      };

      return listStatus[statusDefine];
    };

    return statusAndFieldValid(propReceived.status);
  };

  const secondWindow = () => {
    const urlSegundaTela = `https://cloud.conexaonfe.com.br/#/app/nfer/${xmlNumber}`;
    const configuracoes = "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=800,height=600";
    window.open(urlSegundaTela, "_blank", configuracoes);
  };

  const searchXML = () => {
    const url = `https://api.conexaonfe.com.br/v1/dfes/${notesKey}/detalhes/xml`;
    const jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb25leGFvbmZlLmNvbS5iciIsIm5hbWUiOiJtYXRldXMiLCJpZCI6NTYwNTF9.SDMelkA6zQz0BFtLb-bCH4y6t2pTxWyuI5Lr2Bu_YUo';

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setInfosNoteXML(response.data);
        setXmlNumber(notesKey);
        setNotesKey('');
        // Add logic to set the branch here
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Documento não encontrado.");
        } else if (error.response.status === 400) {
          setError("Chave de acesso inválida.");
        } else {
          setError(`Erro inesperado: ${error.message}`);
        }
      });

    const campoInput = document.getElementById("meuInput");
    campoInput?.focus();
  };

  useEffect(() => {
    const campoInput = document.getElementById("meuInput");
    campoInput?.focus();
  }, []);

  return (
    <Card elevation={0} className="pa-2" style={{ borderRadius: 0 }}>
      <Typography variant="h5" color="primary">
        DADOS DO PEDIDO
      </Typography>
      <Grid container spacing={2}>
        {showField('serialFisco') && (
          <Grid item sm={2}>
            <Input
              value={propReceived.fisco.serialFisco}
              onChange={(e) => (propReceived.fisco.serialFisco = e.target.value)}
              label="Serie(input)"
            />
          </Grid>
        )}
        {showField('numberFisco') && (
          <Grid item sm={2}>
            <Input
              value={propReceived.fisco.numberFisco}
              onChange={(e) => (propReceived.fisco.numberFisco = e.target.value)}
              label="Numero(input)"
            />
          </Grid>
        )}
        {showField('keyFisco') && (
          <>
            <Grid item sm={6}>
              <Input
                value={notesKey}
                onChange={(e) => setNotesKey(e.target.value)}
                label="Número da chave da nota"
                type="number"
                id="meuInput"
                onKeyUp={(e) => e.key === 'Enter' && searchXML()}
              />
            </Grid>
            <Grid item sm={2}>
              <Button
                disabled={true}
                color="green"
                onClick={searchXML}
                elevation="2"
              >
                buscar nota
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      {infosNoteXML && (
        <Card elevation={2}>
          <Typography color="primary" className="ma-5">
            BUSCA DE NOTA VIA CHAVE XML: {xmlNumber}<br />
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <Card className="mx-auto" tile>
                <div>
                  <Typography>NUMERO DA FILIAL: {branch?.numero}</Typography>
                  <Typography>NOME DA FILIAL: {branch?.filial}</Typography>
                  <Typography variant="h6">DADOS DA NOTA</Typography>
                  <Button color="green" onClick={secondWindow} elevation="0">
                    + mais detalhes nota
                  </Button>
                </div>
                <div>
                  <Typography variant="h6">INFORMAÇÕES DE NOTA</Typography>
                  <Typography><b>NUMERO:</b> {infosNoteXML.numero} <b>SERIE:</b> {infosNoteXML.serie}</Typography>
                  <Typography><b>VALOR TOTAL DA NOTA:</b> {infosNoteXML.valorTotalDaNota}</Typography>
                  <Typography><b>CNPJ EMITENTE:</b> {infosNoteXML.cnpjEmitente} <b>NOME DO EMITENTE:</b> {infosNoteXML.nomeEmitente} <b>UF EMITENTE:</b> {infosNoteXML.ufEmitente}</Typography>
                  <Typography><b>CNPJ DESTINATARIO:</b> {infosNoteXML.cnpjDestinatario} <b>NOME DO DESTINATARIO:</b> {infosNoteXML.nomeDestinatario} <b>UF DESTINATARIO:</b> {infosNoteXML.ufDestinatario}</Typography>
                  <Typography><b>INFORMAÇÕES ADICIONAIS:</b> {infosNoteXML.informacoesAdicionais}</Typography>
                </div>
                <div>
                  <Typography variant="h6">INFORMAÇÕES DE PRODUTOS</Typography>
                  <table>
                    <thead>
                      <tr>
                        {headers.map((header) => (
                          <th key={header.value}>{header.text}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {infosNoteXML.itens.map((item: any, index: number) => (
                        <tr key={index}>
                          {headers.map((header) => (
                            <td key={header.value}>{item[header.value]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Card>
      )}
    </Card>
  );
};

export default SupplierRequest;
