/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    let questions

    await fetch('http://espoonkopsu.fi:8020/data/questions/?')
        .then(response => response.json())
        .then(data => questions = data)

    return{
        body: questions
    }
}