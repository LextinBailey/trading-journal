export function calculateTradeStats(trades: any[]) {
    const totalTrades = trades.length;

    const totalPnl = trades.reduce((sum, trade) => {
        return sum + (trade.pnl || 0);
    }, 0);

    const wins = trades.filter(trade => trade.pnl > 0).length;

    const winRate = totalTrades === 0 ? 0 : wins / totalTrades;

    return {
        totalTrades,
        totalPnl,
        winRate
    };
}