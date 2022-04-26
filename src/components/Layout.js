import React from 'react';
import Link from 'next/link';

const pages = {
	how: 'Nasıl Oynanır?',
	stories: 'Hikayeler',
	roadmap: 'Roadmap',
};

const Layout = ({ children, showMenu = true }) => {
	return (
		<div
			className={'w-full h-screen bg-cyan-200 text-base-100 overflow-hidden'}
			data-theme={'mytheme'}>
			{showMenu && (
				<div className={'w-full fixed p-4 flex flex-row'}>
					<div className={'w-1/5'}>
						<Link href={'/home'}>
							<img
								className={'cursor-pointer'}
								src={'/logo.svg'}
								width={306 * 0.4}
								height={112 * 0.4}
								alt={'Logo'}
							/>
						</Link>
					</div>
					<div className={'w-4/5 flex flex-row justify-end'}>
						{Object.keys(pages).map((x) => (
							<Link href={`/${x}`} key={x}>
								<a key={x} className={'w-auto cursor-pointer'}>
									<span
										className={
											'font-bold text-2xl mx-2 text-yellow-400 hover:text-[#fe0000]'
										}
										style={{
											textShadow:
												'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
										}}>
										{pages[x]}
									</span>
								</a>
							</Link>
						))}
						<button
							className={
								'btn btn-primary rounded-full text-white text-xl ml-4 mt-[-8px]'
							}>
							BAĞLAN
						</button>
					</div>
				</div>
			)}
			{children}
		</div>
	);
};

export default Layout;
