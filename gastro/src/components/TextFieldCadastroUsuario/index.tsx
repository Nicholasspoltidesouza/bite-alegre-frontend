import React, { useState } from 'react';

const TextInputExample = () => {
  const [name, setName] = useState('');
  
  return (
    <div className="p-10">
      <input
        className="h-14 rounded-full px-4 py-4 bg-[#FFE8D6] text-base text-gray-800 placeholder-[#FF9966] w-full"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nome"
      />
    </div>
  );
};

export default TextInputExample;