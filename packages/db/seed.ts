import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      image: 'https://avatar.vercel.sh/demo',
    },
  });
  console.log('✅ User created:', user.email);

  // Demo portfolio
  const portfolio = await prisma.portfolio.upsert({
    where: { id: 'demo-portfolio' },
    update: {},
    create: {
      id: 'demo-portfolio',
      userId: user.id,
      name: 'Demo Portfolio',
      baseCurrency: 'EUR',
      benchmark: 'SPY',
      riskFreeRate: 0.03,
    },
  });
  console.log('✅ Portfolio created:', portfolio.name);

  // Demo positions
  const positions = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      assetType: 'EQUITY',
      currency: 'USD',
      quantity: 50,
      avgCost: 150.0,
      broker: 'Interactive Brokers',
      tags: ['tech', 'growth'],
      currentPrice: 178.5,
      currentValue: 8925.0,
      costBasis: 7500.0,
      unrealizedPnL: 1425.0,
      unrealizedPnLPercent: 19.0,
      dailyChange: 2.5,
      dailyChangePercent: 1.42,
      weight: 35.7,
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      assetType: 'EQUITY',
      currency: 'USD',
      quantity: 30,
      avgCost: 300.0,
      broker: 'Interactive Brokers',
      tags: ['tech', 'value'],
      currentPrice: 378.5,
      currentValue: 11355.0,
      costBasis: 9000.0,
      unrealizedPnL: 2355.0,
      unrealizedPnLPercent: 26.17,
      dailyChange: -1.2,
      dailyChangePercent: -0.32,
      weight: 45.4,
    },
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      assetType: 'EQUITY',
      currency: 'USD',
      quantity: 25,
      avgCost: 120.0,
      broker: 'Degiro',
      tags: ['tech', 'advertising'],
      currentPrice: 141.5,
      currentValue: 3537.5,
      costBasis: 3000.0,
      unrealizedPnL: 537.5,
      unrealizedPnLPercent: 17.92,
      dailyChange: 0.8,
      dailyChangePercent: 0.57,
      weight: 14.1,
    },
    {
      ticker: 'TSLA',
      name: 'Tesla Inc.',
      assetType: 'EQUITY',
      currency: 'USD',
      quantity: 20,
      avgCost: 200.0,
      broker: 'Degiro',
      tags: ['tech', 'ev', 'high-risk'],
      currentPrice: 248.5,
      currentValue: 4970.0,
      costBasis: 4000.0,
      unrealizedPnL: 970.0,
      unrealizedPnLPercent: 24.25,
      dailyChange: 5.3,
      dailyChangePercent: 2.18,
      weight: 19.8,
    },
  ];

  for (const pos of positions) {
    await prisma.position.upsert({
      where: {
        portfolioId_ticker: {
          portfolioId: portfolio.id,
          ticker: pos.ticker,
        },
      },
      update: {},
      create: {
        ...pos,
        portfolioId: portfolio.id,
      },
    });
  }
  console.log(`✅ Created ${positions.length} positions`);

  // Demo transactions
  const transactions = [
    {
      type: 'BUY',
      date: new Date('2024-01-15'),
      ticker: 'AAPL',
      quantity: 50,
      price: 150.0,
      fees: 1.5,
    },
    {
      type: 'BUY',
      date: new Date('2024-02-01'),
      ticker: 'MSFT',
      quantity: 30,
      price: 300.0,
      fees: 1.5,
    },
    {
      type: 'BUY',
      date: new Date('2024-03-10'),
      ticker: 'GOOGL',
      quantity: 25,
      price: 120.0,
      fees: 1.0,
    },
    {
      type: 'BUY',
      date: new Date('2024-04-05'),
      ticker: 'TSLA',
      quantity: 20,
      price: 200.0,
      fees: 1.0,
    },
  ];

  const positionMap = new Map(
    (await prisma.position.findMany({
      where: { portfolioId: portfolio.id },
    })).map((p) => [p.ticker, p.id])
  );

  for (const tx of transactions) {
    const positionId = positionMap.get(tx.ticker);
    if (!positionId) continue;

    await prisma.transaction.create({
      data: {
        ...tx,
        positionId,
        portfolioId: portfolio.id,
        totalValue: tx.quantity * tx.price + tx.fees,
      },
    });
  }
  console.log(`✅ Created ${transactions.length} transactions`);

  // Demo watchlist
  const watchlist = ['NVDA', 'META', 'AMZN', 'AMD'];
  for (const ticker of watchlist) {
    await prisma.watchlist.upsert({
      where: {
        portfolioId_ticker: {
          portfolioId: portfolio.id,
          ticker,
        },
      },
      update: {},
      create: {
        portfolioId: portfolio.id,
        ticker,
      },
    });
  }
  console.log(`✅ Created ${watchlist.length} watchlist items`);

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
