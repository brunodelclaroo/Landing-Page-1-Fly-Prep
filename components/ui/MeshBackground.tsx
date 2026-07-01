export function MeshBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 animate-mesh opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(27,48,123,0.55), transparent 45%), radial-gradient(circle at 80% 30%, rgba(247,115,53,0.25), transparent 40%), radial-gradient(circle at 50% 80%, rgba(42,68,153,0.45), transparent 45%)",
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  );
}
