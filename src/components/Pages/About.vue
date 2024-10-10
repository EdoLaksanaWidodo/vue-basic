<template>
    <div>
        <h1 class="text-4xl font-bold text-center my-4">About</h1>
        <table id="AboutTable" class="table-auto border-collapse border border-gray-200">
            <thead>
                <tr>
                    <th class="border border-gray-300 p-2">User ID</th>
                    <th class="border border-gray-300 p-2">ID</th>
                    <th class="border border-gray-300 p-2">Title</th>
                    <th class="border border-gray-300 p-2">Body</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in data" :key="post[1]">
                    <td class="border border-gray-300 p-2">{{ post[0] }}</td>
                    <td class="border border-gray-300 p-2">{{ post[1] }}</td>
                    <td class="border border-gray-300 p-2">{{ post[2] }}</td>
                    <td class="border border-gray-300 p-2">{{ post[3] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    name: "about",

    setup () {
        const data = ref([]);

        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const posts = response.data.slice(0, 5).map(post => [post.userId, post.id, post.title, post.body]);
                data.value = posts;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        onBeforeMount(() => {
            console.log('Component is about to mount. Preparing data...');
        });

        onMounted(async () => {
            await fetchData();
        });

        return { data }
    }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
}

th, td {
    padding: 8px;
    text-align: left;
}
</style>
