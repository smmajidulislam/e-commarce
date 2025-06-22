// dynamic metadata function
export async function generateMetadata({ params }) {
  const product = await fetch(
    `https://example.com/api/products/${params.id}`
  ).then((res) => res.json());

  return {
    title: `${product.title}`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await fetch(
    `https://example.com/api/products/${params.id}`
  ).then((res) => res.json());

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}
