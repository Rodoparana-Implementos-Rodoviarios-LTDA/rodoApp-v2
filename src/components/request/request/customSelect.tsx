import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';

const CustomSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [options, setOptions] = useState<{ text: string; value: any }[]>([]);
  const [query, setQuery] = useState<string>('');

  const loadOptionsFromLocalStorage = () => {
    const produtos = localStorage.getItem('apiData');
    if (produtos) {
      setOptions(JSON.parse(produtos).map((item: any) => ({
        text: item.Description,
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

  return (
    <div>
      <Select value={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger aria-label="Selecione uma opção">
          <SelectValue placeholder="Selecione uma opção" />
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
              <SelectItem key={option.value.Code} value={option.value}>
                {option.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
