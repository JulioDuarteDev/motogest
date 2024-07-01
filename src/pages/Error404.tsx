export function Error404() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="mt-6 text-3xl font-bold text-primary">
          Erro 404 - Página não encontrada
        </h1>
        <p className="mt-2 text-md text-primary">
            A página que você está procurando não existe.
        </p>
      </div>
    );
  }