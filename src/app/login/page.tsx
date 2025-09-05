import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* Puedes agregar tu logo aquí */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿O prefieres?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Crear una cuenta nueva
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
