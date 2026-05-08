export function calculateCumulativePnl(trades: any[]) {
    const data = trades.toSorted((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    const result = [];
    let cumulativePnl = 0;

    for (let i = 0; i < data.length; i++) {
        cumulativePnl += data[i].pnl;
        result.push({ trade: i + 1, cumulativePnl: cumulativePnl });
    }

    return result;
}