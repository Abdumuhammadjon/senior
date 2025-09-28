import React from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
};

const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, description: 'High performance laptop' },
    { id: 2, name: 'Smartphone', price: 699, description: 'Latest model smartphone' },
    { id: 3, name: 'Headphones', price: 199, description: 'Noise cancelling headphones' },
    { id: 4, name: 'Smartwatch', price: 299, description: 'Feature-rich smartwatch' },
];

// ...existing code...
const ProductList: React.FC = () => (
    // markazlashgan konteyner: vertikal va gorizontal markazga joylashadi
    <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-center mb-4">All Products</h1>
            <ul className="list-disc pl-5 space-y-4">
                {products.map(product => (
                    <li key={product.id}>
                        <h2 className="font-medium">{product.name}</h2>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="mt-1">Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default ProductList;
// ...existing code...