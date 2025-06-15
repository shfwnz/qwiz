import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import ParticleBackground from '@/components/particle-background';
import { usePage, Head, router } from '@inertiajs/react';

const Login = () => {
    const { errors } = usePage().props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        router.post('/login', { email, password });
    };

    return (
        <>
            <Head title="Login" />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <ParticleBackground />
                <Card className="justify-center flex flex-col items-center w-full max-w-md space-y-2 p-12">
                    <CardHeader className="flex justify-center">
                        <CardTitle className="text-2xl">Login</CardTitle>
                    </CardHeader>
                    <CardContent className=" w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="gap-2 flex flex-col"
                        >
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email}</p>
                            )}
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500">
                                    {errors.password}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Login'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="w-full">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a
                                href="/register/student"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign up
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default Login;
