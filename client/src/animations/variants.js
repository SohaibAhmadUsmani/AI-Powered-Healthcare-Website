export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
        },
    },
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        }
    }
};

export const cardHover = {
    scale: 1.02,
    y: -8,
    transition: {
        duration: 0.2
    }
};


