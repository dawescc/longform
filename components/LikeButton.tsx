"use client";

import { createClient } from "@/utils/supabase/client";
import { Ban, HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

type LikeButtonProps = {
	article_id: string;
};

const LikeButton = ({ article_id }: LikeButtonProps) => {
	const [liked, setLiked] = useState<boolean | null>(null);
	const [isRateLimited, setIsRateLimited] = useState(false);

	useEffect(() => {
		const sessionLikes = JSON.parse(localStorage.getItem("sessionLikes") || "{}");
		if (sessionLikes[article_id] !== undefined) {
			setLiked(sessionLikes[article_id]);
		}
		checkRateLimit();
	}, [article_id]);

	const checkRateLimit = () => {
		const rateLimitData = JSON.parse(localStorage.getItem("rateLimitData") || "{}");
		const currentTime = new Date().getTime();

		if (rateLimitData.timestamp && currentTime - rateLimitData.timestamp < 60000) {
			// We are within the 1 minute window
			if (rateLimitData.count >= 10) {
				// User has exceeded rate limit
				setIsRateLimited(true);
				setTimeout(() => {
					setIsRateLimited(false);
					resetRateLimit(); // Reset rate limit after timeout
				}, 60000 - (currentTime - rateLimitData.timestamp));
			}
		} else {
			// Outside the 1 minute window or no timestamp, reset rate limit
			resetRateLimit();
		}
	};

	const updateRateLimit = () => {
		const rateLimitData = JSON.parse(localStorage.getItem("rateLimitData") || "{}");
		const currentTime = new Date().getTime();

		if (rateLimitData.timestamp && currentTime - rateLimitData.timestamp < 60000) {
			// Update count if within 1 minute window
			rateLimitData.count += 1;
		} else {
			// Reset if outside 1 minute window
			rateLimitData.count = 1;
			rateLimitData.timestamp = currentTime;
		}

		localStorage.setItem("rateLimitData", JSON.stringify(rateLimitData));
		checkRateLimit(); // Check if updated count exceeds rate limit
	};

	const resetRateLimit = () => {
		localStorage.setItem("rateLimitData", JSON.stringify({ count: 0, timestamp: new Date().getTime() }));
		setIsRateLimited(false);
	};

	const handleButtonClick = async () => {
		if (isRateLimited) {
			console.log("Rate limit exceeded. Please wait.");
			return;
		}

		updateRateLimit();

		const newLikedState = !liked;
		setLiked(newLikedState);

		const supabase = createClient();
		const num = newLikedState ? 1 : -1;
		console.log(article_id);
		const { data, error } = await supabase
			.from("longform_likes")
			.insert([{ article_id, like: num }])
			.single();

		if (error) {
			console.error("Error updating like", error);
			setLiked(liked); // Revert to previous state in case of error
			return;
		}

		const sessionLikes = JSON.parse(localStorage.getItem("sessionLikes") || "{}");
		sessionLikes[article_id] = newLikedState;
		localStorage.setItem("sessionLikes", JSON.stringify(sessionLikes));
	};

	return (
		<button
			className='button default px-2'
			onClick={handleButtonClick}
			disabled={isRateLimited}>
			{isRateLimited ? <Ban /> : liked ? <HeartIcon className='text-red-400' /> : <HeartIcon />}
		</button>
	);
};

export default LikeButton;
