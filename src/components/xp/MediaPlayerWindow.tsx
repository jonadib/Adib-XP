import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, Globe, ArrowRight, SkipBack, SkipForward } from 'lucide-react';

interface MediaItem {
    src: string;
    title: string;
}

interface MediaPlayerWindowProps {
    type: 'video' | 'audio';
    playlist: MediaItem[];
}

const MediaPlayerWindow = ({ type, playlist }: MediaPlayerWindowProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [addressBar, setAddressBar] = useState('');
    const [currentMedia, setCurrentMedia] = useState({ src: '', title: '', isYoutube: false });
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

    const getYoutubeEmbedUrl = (url: string) => {
        const iframeMatch = url.match(/src="([^"]+)"/);
        const finalUrl = iframeMatch ? iframeMatch[1] : url;
        const videoMatch = finalUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const playlistMatch = finalUrl.match(/[?&]list=([^#\&\?]+)/);

        if (playlistMatch) return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`;
        if (videoMatch) return `https://www.youtube.com/embed/${videoMatch[1]}`;
        if (finalUrl.includes('youtube.com/embed/')) return finalUrl;
        return null;
    };

    const loadMedia = (item: MediaItem) => {
        const embedUrl = getYoutubeEmbedUrl(item.src);
        if (embedUrl) {
            setCurrentMedia({ src: embedUrl, title: item.title, isYoutube: true });
        } else {
            setCurrentMedia({ src: item.src, title: item.title, isYoutube: false });
        }
        setAddressBar(item.src);
        setIsPlaying(false);
    };

    useEffect(() => {
        if (playlist.length > 0) {
            loadMedia(playlist[currentIndex]);
        }
    }, [currentIndex, playlist]);

    const handleAddressSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        loadMedia({ src: addressBar, title: "Custom Media" });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const togglePlay = () => {
        if (currentMedia.isYoutube) return;
        if (mediaRef.current) {
            if (isPlaying) {
                mediaRef.current.pause();
            } else {
                mediaRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const stop = () => {
        if (currentMedia.isYoutube) return;
        if (mediaRef.current) {
            mediaRef.current.pause();
            mediaRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (mediaRef.current) {
            setCurrentTime(mediaRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (mediaRef.current) {
            setDuration(mediaRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentMedia.isYoutube) return;
        const time = parseFloat(e.target.value);
        if (mediaRef.current) {
            mediaRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleVolumeChange = (delta: number) => {
        setVolume((prev) => {
            const newVol = Math.max(0, Math.min(1, prev + delta));
            if (mediaRef.current) mediaRef.current.volume = newVol;
            return newVol;
        });
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-full bg-[#1a1a1a] text-white font-sans select-none overflow-hidden text-[11px]">
            {/* XP-Style Address Bar (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-[#ece9d8] border-b border-[#aca899] shadow-sm text-black">
                <span className="text-[#444] font-medium">URL</span>
                <form onSubmit={handleAddressSubmit} className="flex-1 flex items-center bg-white border border-[#7f9db9] h-5 px-1 shadow-inner relative overflow-hidden">
                    <Globe className="w-3.5 h-3.5 mr-1 text-blue-600" />
                    <input
                        type="text"
                        value={addressBar}
                        onChange={(e) => setAddressBar(e.target.value)}
                        className="flex-1 text-[11px] text-black bg-transparent outline-none border-none h-full"
                        placeholder="Paste YouTube or Media URL..."
                    />
                    <button type="submit" className="absolute right-0 top-0 bottom-0 px-1 bg-[#ece9d8] border-l border-[#aca899] flex items-center hover:bg-white transition-colors">
                        <ArrowRight className="w-3 h-3 text-green-600" />
                    </button>
                </form>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center p-2 md:p-4 gap-4 md:gap-6 bg-[#222] overflow-y-auto">
                {type === 'audio' && !currentMedia.isYoutube ? (
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-xl">
                        {/* Left Side: Album Art Display */}
                        <div className="relative w-[70%] md:w-[45%] aspect-square rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/5 flex-shrink-0">
                            <img
                                src="/Black Red Grunge Moon Light Music Album Cover.jpg"
                                alt="Album Cover"
                                className="w-full h-full object-cover"
                            />
                            {/* Text Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                                <h2 className="text-sm font-bold leading-tight truncate">{currentMedia.title}</h2>
                                <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">Scribe</p>
                            </div>
                            <audio
                                ref={mediaRef as React.RefObject<HTMLAudioElement>}
                                src={currentMedia.src}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                            />
                        </div>

                        {/* Right Side: Vintage Click Wheel */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full">
                            {/* Track Timeline / Seeker */}
                            <div className="mb-4 md:mb-6 w-full px-4 flex flex-col gap-1.5">
                                <div className="flex justify-between text-[9px] text-gray-500 font-mono tracking-tighter uppercase">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    step="0.01"
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-1 bg-black/40 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all border border-white/5"
                                />
                            </div>

                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1a1a1a] shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.4)] border border-white/5 flex items-center justify-center flex-shrink-0">
                                {/* The Outer Circle/Wheel */}
                                <div className="absolute inset-1.5 rounded-full border border-white/5 bg-gradient-to-br from-[#2a2a2a] to-[#121212]" />

                                {/* Volume Up (+/Plus) */}
                                <button
                                    onClick={() => handleVolumeChange(0.1)}
                                    className="absolute top-4 hover:text-blue-400 transition-colors active:scale-95"
                                >
                                    <span className="text-xl font-light opacity-60">+</span>
                                </button>

                                {/* Volume Down (-/Minus) */}
                                <button
                                    onClick={() => handleVolumeChange(-0.1)}
                                    className="absolute bottom-4 hover:text-blue-400 transition-colors active:scale-95"
                                >
                                    <span className="text-xl font-light opacity-60">−</span>
                                </button>

                                {/* Previous (<<) */}
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 hover:text-blue-400 transition-colors active:scale-95"
                                >
                                    <SkipBack className="w-5 h-5 fill-white/10 opacity-60" />
                                </button>

                                {/* Next (>>) */}
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 hover:text-blue-400 transition-colors active:scale-95"
                                >
                                    <SkipForward className="w-5 h-5 fill-white/10 opacity-60" />
                                </button>

                                {/* Center Action Button (Play/Pause) */}
                                <button
                                    onClick={togglePlay}
                                    className="relative w-14 h-14 rounded-full bg-[#1a1a1a] shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/5 flex items-center justify-center group active:scale-95 transition-all"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 fill-current text-white/80 group-hover:text-blue-400 transition-colors" />
                                    ) : (
                                        <Play className="w-6 h-6 fill-current text-white/80 ml-1 group-hover:text-blue-400 transition-colors" />
                                    )}
                                </button>
                            </div>

                            {/* Volume Indicator Bar */}
                            <div className="mt-6 flex items-center gap-2 w-32">
                                <Volume2 className="w-2.5 h-2.5 text-gray-500" />
                                <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                                        style={{ width: `${volume * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center relative">
                        {currentMedia.isYoutube ? (
                            <iframe
                                src={currentMedia.src}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <video
                                ref={mediaRef as React.RefObject<HTMLVideoElement>}
                                src={currentMedia.src}
                                className="w-full h-full object-contain"
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onClick={togglePlay}
                            />
                        )}

                        {/* Overlay Controls for Video (XP Style) */}
                        {!currentMedia.isYoutube && (
                            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] tabular-nums font-medium opacity-80 text-white">{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        step="0.1"
                                        value={currentTime}
                                        onChange={handleSeek}
                                        className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-400"
                                    />
                                    <span className="text-[10px] tabular-nums font-medium opacity-80 text-white">{formatTime(duration)}</span>
                                </div>
                                <div className="flex justify-between items-center text-white">
                                    <div className="flex items-center gap-2">
                                        <button onClick={handlePrev} className="p-1 hover:text-blue-400 transition-colors"><SkipBack className="w-4 h-4" /></button>
                                        <button onClick={togglePlay} className="p-1 hover:text-blue-400 transition-colors">{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}</button>
                                        <button onClick={stop} className="p-1 hover:text-blue-400 transition-colors"><Square className="w-4 h-4" /></button>
                                        <button onClick={handleNext} className="p-1 hover:text-blue-400 transition-colors"><SkipForward className="w-4 h-4" /></button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Volume2 className="w-3 h-3 opacity-60" />
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={volume}
                                            onChange={(e) => {
                                                const v = parseFloat(e.target.value);
                                                setVolume(v);
                                                if (mediaRef.current) mediaRef.current.volume = v;
                                            }}
                                            className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Playback Progress (Small bar at very bottom) */}
            {!currentMedia.isYoutube && type === 'audio' && (
                <div className="h-[2px] w-full bg-black/20 overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default MediaPlayerWindow;


