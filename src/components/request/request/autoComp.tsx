import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
} from '../../ui/select';

interface CustomAutocompleteProps {
  productData: any;
  onItemSelected: (item: any) => void;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({ productData, onItemSelected }) => {
  const [selectedOption, setSelectedOption] = useState<any>(productData);
  const [options, setOptions] = useState<{ text: string; value: any }[]>([]);
  const [query, setQuery] = useState<string>('');

  const loadOptionsFromLocalStorage = () => {
    const produtos = localStorage.getItem('request');
    if (produtos) {
      setOptions(JSON.parse(produtos).map((item: any) => ({
        text: `${item.numero} -> ${item.filial}`,
        value: item,
      })));
    }
  };

  const customFilter = (options: { text: string; value: any }[], query: string) => {
    const normalizedQuery = query.toLowerCase();
    return options.filter(option => option.text.toLowerCase().includes(normalizedQuery));
  };

  useEffect(() => {
    loadOptionsFromLocalStorage();
  }, []);

  const filteredOptions = customFilter(options, query);

  const handleInputChange = (value: any) => {
    setSelectedOption(value);
    onItemSelected(value);
  };

  return (
    <div>
      <Select value={selectedOption} onValueChange={handleInputChange}>
        <SelectTrigger aria-label="Selecione um produto">
          <SelectValue placeholder="Selecione um produto" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite para filtrar produtos"
              className="w-full px-2 py-1 border rounded"
            />
          </div>
          <SelectGroup>
            {filteredOptions.map((option) => (
              <SelectItem key={option.value.numero} value={option.value}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomAutocomplete;
