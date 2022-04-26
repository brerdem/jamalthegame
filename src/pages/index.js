import Layout from '../components/Layout';
import Link from 'next/link';

export default function Start() {
	return (
		<Layout showMenu={false}>
			<div className="flex justify-center items-center w-full h-full">
				<div className={'flex flex-col items-center w-auto h-auto'}>
					<img
						src={'/logo.svg'}
						width={306 * 1.5}
						height={112 * 1.5}
						alt={'Logo'}
					/>
					<div className={'font-thin text-5xl mt-[-40px]'}>
						bir sevgi faresi
					</div>

					<div className={'mt-12'}>
						<Link href={'/home'}>
							<button className={'btn btn-primary text-white text-xl'}>
								Oyuna Başla
							</button>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
