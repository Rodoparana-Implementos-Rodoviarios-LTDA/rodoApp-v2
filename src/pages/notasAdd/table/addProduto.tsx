'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Combobox } from '../../../components/ui/combobox'
import { produtos } from '@/data/NF/data'

interface AddProdutoProps {
  onSave: (newProduct: any) => void
  productToEdit?: any
}

export function AddProduto({ onSave, productToEdit }: AddProdutoProps) {
  const [quantidade, setQuantidade] = useState<string>(productToEdit?.quantidade?.toString() || '')
  const [valorUnitario, setValorUnitario] = useState<string>(productToEdit?.vlrUnit?.toString() || '')
  const [valorTotal, setValorTotal] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<{ value: string; label: string } | null>(
    productToEdit ? { value: productToEdit.codProduto, label: productToEdit.descProduto } : null
  )

  useEffect(() => {
    const quantidadeNum = parseFloat(quantidade)
    const valorUnitarioNum = parseFloat(valorUnitario)
    if (!isNaN(quantidadeNum) && !isNaN(valorUnitarioNum)) {
      setValorTotal((quantidadeNum * valorUnitarioNum).toFixed(2))
    } else {
      setValorTotal('')
    }
  }, [quantidade, valorUnitario])

  const handleSave = () => {
    if (!selectedProduct) return

    const newProduct = {
      produto: selectedProduct.label,
      cod: selectedProduct.value || '',
      origemProd: productToEdit?.origemProd || 'Nacional', // Simulando valores
      umProtheus: productToEdit?.umProtheus || 'UN', // Simulando valores
      ncm: productToEdit?.ncm || '12345678', // Simulando valores
    }
    onSave(newProduct)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='h-13 text-indigo-00 text-lg ring-1 ring-indigo-800 hover:bg-indigo-800 hover:text-white'
        >
          {productToEdit ? 'Edit Item' : 'Adicionar novo Item'}
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[850px]'>
        <DialogHeader>
          <DialogTitle className='text-3xl'>
            {productToEdit ? 'Editar Item' : 'Adicionar Item'}
          </DialogTitle>
          <DialogDescription className='text-xl'>
            Preencha as informações do item. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4'>
          <Combobox
            options={produtos}
            placeholder='Selecionar Produto...'
            searchPlaceholder='Selecionar Produto...'
            noResultsText='Nenhum Produto encontrado.'
            onValueChange={(value) => {
              const product = produtos.find((p) => p.value === value)
              setSelectedProduct(product || null)
            }}
            className='flex-1'
            value={selectedProduct?.value || ''}
          />
          <div className='flex justify-between'>
            <Input
              disabled
              id='Unidade de Medida'
              placeholder='Unidade de Medida'
              className='h-12 w-auto text-xl'
              value={productToEdit?.um || ''}
            />
            <Input
              disabled
              id='Origem'
              placeholder='Origem'
              className='h-12 w-auto text-xl'
              value={productToEdit?.origem || ''}
            />
            <Input
              disabled
              id='NCM'
              placeholder='NCM'
              className='h-12 w-auto text-xl'
              value={productToEdit?.ncm || ''}
            />
          </div>
          <div className='flex justify-between'>
            <div className='w-58'>
              <Label htmlFor='Quantidade' className='text-right'>
                Quantidade
              </Label>
              <Input
                id='Quantidade'
                placeholder='Quantidade'
                className='h-12 text-xl'
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
            <div className='w-58'>
              <Label htmlFor='ValorUnitario' className='text-right'>
                Valor Unitário
              </Label>
              <Input
                id='ValorUnitario'
                placeholder='Valor Unitário'
                className='h-12 text-xl'
                value={valorUnitario}
                onChange={(e) => setValorUnitario(e.target.value)}
              />
            </div>
            <div className='w-58'>
              <Label htmlFor='ValorTotal' className='text-right'>
                Valor Total
              </Label>
              <Input
                id='ValorTotal'
                placeholder='Valor Total'
                className='h-12 text-xl'
                value={`R$ ${valorTotal}`}
                disabled
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='button' onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
