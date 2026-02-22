import { useEffect } from 'react';

interface ShakeConfig {
    threshold?: number;
    timeout?: number;
}

export const useShake = (
    onShake: () => void,
    { threshold = 15, timeout = 1000 }: ShakeConfig = {}
) => {
    useEffect(() => {
        let lastTime = new Date().getTime();
        let lastX: number | null = null;
        let lastY: number | null = null;
        let lastZ: number | null = null;

        const handleDeviceMotion = (e: DeviceMotionEvent) => {
            const current = e.accelerationIncludingGravity;
            if (!current || current.x === null || current.y === null || current.z === null) return;

            const currentTime = new Date().getTime();
            if (currentTime - lastTime > 100) {
                const diffTime = currentTime - lastTime;

                if (lastX !== null && lastY !== null && lastZ !== null) {
                    const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;

                    if (speed > threshold) {
                        onShake();
                        lastTime = currentTime + timeout; // Prevent multiple triggers immediately
                    } else {
                        lastTime = currentTime;
                    }
                } else {
                    lastTime = currentTime;
                }

                lastX = current.x;
                lastY = current.y;
                lastZ = current.z;
            }
        };

        // Request permission for iOS 13+ devices
        const requestPermission = async () => {
            if (
                typeof DeviceMotionEvent !== 'undefined' &&
                typeof (DeviceMotionEvent as any).requestPermission === 'function'
            ) {
                try {
                    const permission = await (DeviceMotionEvent as any).requestPermission();
                    if (permission === 'granted') {
                        window.addEventListener('devicemotion', handleDeviceMotion, false);
                    }
                } catch (error) {
                    console.error('Error requesting device motion permission:', error);
                }
            } else {
                window.addEventListener('devicemotion', handleDeviceMotion, false);
            }
        };

        requestPermission();

        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion, false);
        };
    }, [onShake, threshold, timeout]);
};
