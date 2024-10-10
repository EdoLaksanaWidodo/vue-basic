<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center my-10">Welcome to the Crypto World!</h1>
        <p class="text-center text-lg text-gray-700 mb-10">
            Stay updated with the latest trends, prices, and insights in the world of cryptocurrency.
        </p>

        <!-- Crypto News Section -->
        <h2 class="text-3xl font-semibold mb-6 text-center">Latest Crypto News</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div class="bg-white shadow-lg rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-2">Bitcoin Hits New All-Time High!</h3>
                <p class="text-gray-600 mb-4">
                    Bitcoin has surged past $60,000, marking a new milestone in its price history.
                </p>
                <a href="#" class="text-blue-600 hover:underline">Read more</a>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-2">Ethereum 2.0 Launch Date Confirmed</h3>
                <p class="text-gray-600 mb-4">
                    The highly anticipated Ethereum 2.0 upgrade is set to launch next month.
                </p>
                <a href="#" class="text-blue-600 hover:underline">Read more</a>
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-2">Top 5 Altcoins to Watch in 2024</h3>
                <p class="text-gray-600 mb-4">
                    Discover the altcoins that are expected to make waves in the upcoming year.
                </p>
                <a href="#" class="text-blue-600 hover:underline">Read more</a>
            </div>
        </div>

        <!-- Crypto Price Tracker Section -->
        <h2 class="text-3xl font-semibold mb-6 text-center">Crypto Price Tracker</h2>
        <div class="overflow-x-auto mb-10">
            <table class="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="py-3 px-4 text-left">Cryptocurrency</th>
                        <th class="py-3 px-4 text-left">Price (USD)</th>
                        <th class="py-3 px-4 text-left">Market Cap</th>
                        <th class="py-3 px-4 text-left">24h Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border-b py-2 px-4">Bitcoin (BTC)</td>
                        <td class="border-b py-2 px-4">$61,500</td>
                        <td class="border-b py-2 px-4">$1.15T</td>
                        <td class="border-b py-2 px-4 text-green-500">+5.6%</td>
                    </tr>
                    <tr>
                        <td class="border-b py-2 px-4">Ethereum (ETH)</td>
                        <td class="border-b py-2 px-4">$4,200</td>
                        <td class="border-b py-2 px-4">$490B</td>
                        <td class="border-b py-2 px-4 text-red-500">-1.2%</td>
                    </tr>
                    <tr>
                        <td class="border-b py-2 px-4">Ripple (XRP)</td>
                        <td class="border-b py-2 px-4">$1.10</td>
                        <td class="border-b py-2 px-4">$52B</td>
                        <td class="border-b py-2 px-4 text-green-500">+3.4%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.container {
    max-width: 1200px;
}

img {
    max-width: 100%;
    height: auto;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
}

th {
    background-color: #f9f9f9;
}

td {
    border: 1px solid #e2e2e2;
}

.text-green-500 {
    color: #48bb78;
}

.text-red-500 {
    color: #f56565;
}
</style>
