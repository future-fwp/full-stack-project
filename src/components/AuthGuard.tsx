import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface AuthGuardProps {
	children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const { user } = useAuthStore();
	const location = useLocation();

	if (!user) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	return <>{children}</>;
}
