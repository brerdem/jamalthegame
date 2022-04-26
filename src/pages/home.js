import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../components/Layout';
import TinderCard from 'react-tinder-card';
import { Transition } from '@headlessui/react';
import Typewriter from 'typewriter-effect';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
