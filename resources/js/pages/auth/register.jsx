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

const Register = () => {
    const { errors } = usePage().props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        router.post('/register', { name, email, password });
    };
    return (
        <>
            <Head title="Register" />
            <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full ">
                <ParticleBackground />
                <Card className="justify-center flex flex-col items-center w-full max-w-md space-y-2 px-8 py-12">
                    <CardHeader className="flex w-full justify-center">
                        <CardTitle className="text-2xl">Register</CardTitle>
                    </CardHeader>
                    <CardContent className=" w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="gap-3 flex flex-col"
                        >
                            <Input
                                placeholder="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-500">{errors.name}</p>
                            )}
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email}</p>
                            )}
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
                                {loading ? 'Loading...' : 'Register'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="w-full">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign in
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default Register;
