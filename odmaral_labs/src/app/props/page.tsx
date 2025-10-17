type UserProps = {
  name: string;
  age: number;
};

// Props дамжуулж буй component
function UserCard({ name, age }: UserProps) {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Нас: {age}</p>
    </div>
  );
}
export default function Page() {
  return (
    <div className="space-y-4">
      <UserCard name="Ганзориг" age={39} />
      <UserCard name="Ананд" age={20} />
    </div>
  );
}
