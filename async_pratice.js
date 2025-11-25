/*
 1. Promises – the core idea

    A Promise is an object that represents a value that will be available in the future.

    Three states:

    pending → still working
    fulfilled → finished successfully (resolve)
    rejected → finished with error (reject)
 */

// A function that returns a Promise that resolves after 1 second
function waitOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("✅ Done after 1 second");
            // or reject(new Error("Something went wrong"));
        }, 1000);
    });
}

// Using .then() and .catch()
// waitOneSecond()
//     .then(result => {
//         console.log("THEN result:", result);
//     })
//     .catch(error => {
//         console.error("CATCH error:", error);
//     });

function simulateAsyncOperation(success = true, delayMs = 1000) {
    // Return a new Promise object
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                // If success=true, resolve the Promise
                resolve(`✅ Finished after ${delayMs} ms`);
            } else {
                // Otherwise reject the Promise with an Error
                reject(new Error("❌ Simulated async failure"));
            }
        }, delayMs);
    });
}
function promiseThenCatchDemo() {
    console.log(">> promiseThenCatchDemo start");

    simulateAsyncOperation(true, 500)
        .then(result => {
            // This runs when the Promise is resolved
            console.log("THEN:", result);
        })
        .catch(error => {
            // This runs if the Promise is rejected
            console.error("CATCH:", error.message);
        })
        .finally(() => {
            // This always runs at the end (success or error)
            console.log("FINALLY: promiseThenCatchDemo finished\n");
        });
}
// promiseThenCatchDemo();

/*
    2. async/await – nicer way to use Promises

        async/await is just a cleaner syntax for working with Promises.

        async before a function → that function always returns a Promise
        await → pause until the Promise is done (only allowed inside async functions)
*/

async function runWaitExample() {
    try {
        const result = await waitOneSecond(); // wait here
        console.log("async/await result:", result);
    } catch (error) {
        console.error("async/await error:", error);
    }
}
// runWaitExample();

async function asyncAwaitDemo() {
    console.log(">> asyncAwaitDemo start");

    try {
        // await will "pause" inside this async function
        const result = await simulateAsyncOperation(true, 700);
        console.log("async/await result:", result);
    } catch (error) {
        // Handle error with try/catch
        console.error("async/await error:", error.message);
    } finally {
        console.log("FINALLY: asyncAwaitDemo finished\n");
    }
}

/*
    3. fetch – calling an API

        fetch(url) returns a Promise that resolves to a Response object.

        For a typical JSON API:

        -await fetch(url)
        -Check response.ok
        -await response.json() to get actual data
*/

async function fetchPostById(postId) {
    // Build the URL with the postId
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    try {
        console.log(`>> Fetching post ${postId} from: ${url}`);

        // 1) Call the API (returns a Promise)
        const response = await fetch(url);

        // 2) Check if HTTP status is OK (status code 200-299)
        if (!response.ok) {
            // If not OK, throw an Error to be caught by catch block
            throw new Error(`HTTP error! status = ${response.status}`);
        }

        // 3) Parse the response body as JSON
        const data = await response.json();

        // 4) Log the result in a nice format
        console.log("✅ API response data:");
        console.log("ID:", data.id);
        console.log("Title:", data.title);
        console.log("Body:", data.body, "\n");
    } catch (error) {
        // This catch will handle:
        // - network errors
        // - our manual thrown Error (HTTP not OK)
        console.error("❌ fetchPostById error:", error.message, "\n");
    }
}

async function fetchAllPosts() {
    const url = "https://jsonplaceholder.typicode.com/posts";

    try {
        console.log(`>> Fetching all posts from: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status = ${response.status}`);
        }

        const data = await response.json();

        console.log("✅ Fetched all posts. Total posts:", data.length);
        // Log first 3 posts as a sample
        data.slice(0, 3).forEach(post => {
            console.log(`Post ID: ${post.id}, Title: ${post.title}`);
        });
    } catch (error) {
        console.error("❌ fetchAllPosts error:", error.message);
    }
}

async function fetchWithErrorDemo() {
    const badUrl = "https://jsonplaceholder.typicode.com/this-url-does-not-exist";

    console.log(">> fetchWithErrorDemo start");

    try {
        const response = await fetch(badUrl);

        if (!response.ok) {
            // Force an error with HTTP status
            throw new Error(`HTTP error! status = ${response.status}`);
        }

        // Normally this line won't be reached for badUrl
        const data = await response.json();
        console.log("Data:", data);
    } catch (error) {
        // expect to land here
        console.error("Expected error from bad URL:", error.message);
    } finally {
        console.log("FINALLY: fetchWithErrorDemo finished\n");
    }
}
// fetchWithErrorDemo();

async function main() {
    // 1) Demo Promise with then/catch
    // promiseThenCatchDemo();

    // Wait a bit to avoid mixing outputs too much
    // (not necessary, but makes console output clearer)
    // await new Promise(res => setTimeout(res, 1200));

    // 2) Demo async/await
    // await asyncAwaitDemo();

    // 3) Call public API with fetch (success case)
    await fetchPostById(1);
    await fetchPostById(2);
    await fetchPostById(3);

    // 4) Call fetch with a bad URL to see error handling
    // await fetchWithErrorDemo();

    await fetchAllPosts();
}
main();