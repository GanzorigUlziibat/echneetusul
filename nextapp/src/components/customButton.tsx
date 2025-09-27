type ButtonProps = {
  text: string;
};
export function CustomB({ text }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      ​{text}​
    </button>
  );
}

export function CustomB1({ text }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-yellow-500 text-white rounded">
      ​{text}​
    </button>
  );
}
