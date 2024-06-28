import React from 'react';

const GreetingMessage = () => {
  const getGreeting = () => {
    let h = new Date().getHours();
    if (h <= 5) return "Boa madrugada";
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  };

  return <span>{getGreeting()}</span>;
};

export default GreetingMessage;
