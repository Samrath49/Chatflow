import FlowCard from "@/components/FlowComponents/FlowCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex" style={{width: 900, height: 500}}>
        <FlowCard />
      </div>
    </main>
  );
}
