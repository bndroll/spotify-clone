export const checkRole = async (user: any, requiredRole: string) => {
	return await user.then(res => res[0]).then(res => res.role === requiredRole);
};