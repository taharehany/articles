import AdminSideBar from "./AdminSideBar";

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div className='flex'>
			<div className='w-64'>
				<AdminSideBar />
			</div>

			<div className='w-full'>{children}</div>
		</div>
	);
};

export default AdminLayout;
