export async function getCurrencies() {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets/currencies`, {
            credentials: 'include'
        });
    } catch(_) {
        return [];
    }
}

export async function getMarkets() {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets`, {
            credentials: 'include'
        });
    } catch(_) {
        return [];
    }
}

export async function getMarketsData() {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets/data`, {
            credentials: 'include'
        });
    } catch(_) {
        return [];
    }
}

export async function getFavorites() {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets/favorites`, {
            credentials: 'include'
        });
    } catch(_) {
        return [];
    }
}