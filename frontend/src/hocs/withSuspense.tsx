import React, { ComponentType, Suspense } from 'react';


export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
	return (props: WCP) => {
		return (
			<Suspense fallback={<div>Идет загрузка...</div>}>
				<WrappedComponent {...props} />
			</Suspense>
		);
	};
}