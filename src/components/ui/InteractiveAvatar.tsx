"use client";

import { useState } from "react";
import Image from "next/image";
import avatarImg from "../../../public/avatar.png";
import blushImg from "../../../public/blush.png";

interface InteractiveAvatarProps {
    width?: number;
    height?: number;
    priority?: boolean;
}

export default function InteractiveAvatar({ width = 122, height = 122, priority = false }: InteractiveAvatarProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="avatar-wrapper interactive-avatar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                width: `${width}px`,
                height: `${height}px`,
                margin: '0 auto',
            }}
        >
            <Image
                src={avatarImg}
                alt="Ved Saxena Avatar"
                width={width}
                height={height}
                priority={priority}
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    transform: "translateY(3%)",
                }}
            />

            <Image
                src={blushImg}
                alt="Ved Saxena Blushing"
                width={width}
                height={height}
                priority={priority}
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "translateY(3%)",
                    transition: "opacity 0.4s ease",
                    opacity: isHovered ? 1 : 0
                }}
            />
        </div>
    );
}
