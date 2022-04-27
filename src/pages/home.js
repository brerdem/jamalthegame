import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../components/Layout';
import TinderCard from 'react-tinder-card';
import { Transition, Dialog } from '@headlessui/react';
import Typewriter from 'typewriter-effect';

import { FaArrowLeft, FaArrowRight, FaUndo } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '../utils/hooks';
import { useRouter } from 'next/router';

const cards = [
	{
		text: 'Etrafı gezerken bir de ne göresin!',
		leftText: 'Hemen yavşa!',
		rightText: 'Salla gitsin',
		img: 'girl.png',
		correctDir: 'right',
	},
	{
		text: 'Deliğin sonunda bambaşka bir dünyaya geldin.',
		leftText: 'Etrafı gez',
		rightText: 'Geri bas',
		img: 'wonderland.png',
		correctDir: 'right',
	},
	{
		text: 'Kaçarken yerde bir delik gördün.',
		leftText: 'Hemen gir!',
		rightText: 'Koşmaya devam!',
		img: 'hole.png',
		correctDir: 'right',
	},
	{
		text: 'Şero sen onu sallamayınca sinirlendi, durdurdu seni.',
		leftText: 'Özür dile',
		rightText: 'Patlat bi tane',
		img: 'sero2.png',
		correctDir: 'right',
	},
	{
		text: 'Dışarı çıktın bir baktın karşında Şero!',
		leftText: 'Yanından bas geç',
		rightText: 'Selam ver',
		img: 'sero.png',
		correctDir: 'right',
	},
	{
		text: 'Güzel bir güne başladın. Ne yapmak istersin?',
		leftText: 'Dışarı çık',
		rightText: 'Evde kal',
		img: 'days.png',
		correctDir: 'left',
	},
];

export default function Home() {
	const [index, setIndex] = useState(cards.length - 1);
	const [correctCount, setCorrectCount] = useState(0);
	const [isShowing, setIsShowing] = useState(false);
	const [typeWriter, setTypeWriter] = useState(null);
	const { width, height } = useWindowSize();
	const [isComplete, setIsComplete] = useState(false);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const currentIndexRef = useRef(index);

	const childRefs = useMemo(
		() => cards.map((x, index) => React.createRef()),
		[]
	);

	const canSwipe = useMemo(() => index >= 0, [index]);

	const handleSwipe = (dir) => {
		console.log('index handle -->', index);
		if (dir === cards[index].correctDir) {
			setCorrectCount(correctCount + 1);
		}
		setIndex((index) => index - 1);
		currentIndexRef.current = currentIndexRef.current - 1;

		setIsShowing(false);
	};

	const swipe = async (dir) => {
		console.log('index swipe -->', index);
		if (canSwipe) {
			await childRefs[index].current.swipe(dir);
		}
	};

	const handleCardLeft = (_) => {
		console.log('currentIndexRef.current ', currentIndexRef.current);
		if (currentIndexRef.current <= -1) {
			setIsComplete(true);
		}
	};

	//const isShowing = useMemo(() => index >= 0, [index]);

	const handleUndo = async () => {
		if (index < cards.length - 1) {
			setOpen(false);
			setTimeout(async () => {
				setIndex(index + 1);
				currentIndexRef.current = index + 1;
				await childRefs[index + 1].current.restoreCard();
			}, 750);
		}
	};

	useEffect(() => {
		if (typeWriter && index >= 0) {
			typeWriter
				.deleteAll(10)
				.typeString(cards[index].text)
				.callFunction(() => setIsShowing(true))
				.start();
		}
	}, [typeWriter, index]);

	return (
		<Layout>
			<Transition appear show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={() => setOpen(false)}>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<div className="inline-block w-auto pb-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<div className="mt-2">
									<img
										src={'/metamask.png'}
										width={340}
										height={426}
										alt="Metamask"
									/>
								</div>

								<div className="mt-4 px-4 flex flex-row justify-end">
									<button
										className="btn bg-slate-400 text-white border-0"
										onClick={() => setOpen(false)}>
										Reject
									</button>
									<button
										className="btn bg-blue-600 text-white border-0 ml-4"
										onClick={handleUndo}>
										Accept
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>

			<div className="flex items-center absolute right-6 top-24">
				<button
					className="btn btn-ghost gap-2 font-mono text-xl text-primary"
					onClick={() => setOpen(true)}>
					<FaUndo />
					UNDO
				</button>
			</div>

			{isComplete && (
				<ReactConfetti
					width={width}
					height={height}
					className="w-full h-full pointer-events-none"
				/>
			)}
			<div className="flex justify-center mt-48 w-full h-full">
				{isComplete ? (
					<div className={'flex items-center flex-col'}>
						<h1 className={'text-8xl text-primary animate-bounce'}>
							TEBRİKLER!
						</h1>
						<p className={'text-3xl mt-10'}>1. hikayeyi başarıyla bitirdin!</p>
						<button
							className={'btn btn-primary text-white text-xl mt-24'}
							onClick={() => router.reload()}>
							Ödülünü Topla!
						</button>
					</div>
				) : (
					<div className={'flex flex-col items-center'}>
						<div className={'mb-24'}>
							<Typewriter
								options={{
									delay: 50,
									wrapperClassName: 'text-center text-3xl font-mono',
									cursorClassName:
										'text-2xl opacity-0 animate-cursor font-mono pb-2',
								}}
								onInit={(typewriter) => {
									setTypeWriter(typewriter);
								}}
							/>
						</div>

						{/*<h2 className={'text-center text-3xl mb-24'}>{cards[index].text}</h2>*/}

						<div
							className={'flex flex-row items-center justify-evenly h-[400px]'}>
							<div className={'w-96'}>
								<Transition
									appear={true}
									show={isShowing}
									enter="transition-opacity duration-1000"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									className={'flex justify-center flex-row items-center '}>
									<button
										className={'btn btn-ghost btn-circle'}
										onClick={() => swipe('left')}>
										<FaArrowLeft size={24} />
									</button>
									<span className={'text-xl'}>
										{cards[index]?.leftText ?? cards[0].leftText}
									</span>
								</Transition>
							</div>

							<div className={'relative w-[400px] h-[400px]'}>
								{cards.map((card, i) => (
									<TinderCard
										ref={childRefs[i]}
										className={'absolute z-0 w-[400px] h-[400px] '}
										key={card.img}
										onSwipe={handleSwipe}
										onCardLeftScreen={handleCardLeft}
										preventSwipe={['up', 'down']}>
										<div
											key={card.img}
											className={`bg-white overflow-hidden rounded-lg ${
												i === index && 'shadow-xl '
											}`}>
											<img
												src={`/cards/${card.img}`}
												className={'w-[400px] h-[400px]'}
											/>
										</div>
									</TinderCard>
								))}
							</div>
							<div className={'w-96'}>
								<Transition
									appear={true}
									show={isShowing}
									enter="transition-opacity duration-1000"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									className={'flex justify-center flex-row items-center '}>
									<span className={'text-xl'}>
										{cards[index]?.rightText ?? cards[0].rightText}
									</span>
									<button
										className={'btn btn-ghost btn-circle'}
										onClick={() => swipe('right')}>
										<FaArrowRight size={24} />
									</button>
								</Transition>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}
