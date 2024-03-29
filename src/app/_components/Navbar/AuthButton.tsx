'use client';
import { Spinner } from '@nextui-org/spinner';
import { useSession } from 'next-auth/react';
import LogInButton from './LoginButton';
import { LogoutButton } from './LogoutButton';

export default function AuthButton() {
	const session = useSession();
	return (
		<>
			{session.status == 'unauthenticated' ? (
				<LogInButton />
			) : session.status == 'authenticated' ? (
				<LogoutButton />
			) : (
				<Spinner color="secondary" />
			)}
		</>
	);
}
