type ButtonProps = {
  text: string;
  color: string;
};
export function CustomB({ text, color }: ButtonProps) {
  return (
    <button
      className={`
    w-40 rounded-lg p-3 m-2 font-bold transition-all duration-100 border-2 active:scale-[0.98]
    bg-${color}-500
    `}
    >
      ​{text}​
    </button>
  );
}

export function CustomB1({ text }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      ​{text}​
    </button>
  );
}
