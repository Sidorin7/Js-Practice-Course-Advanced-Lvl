const postData = async (url, data) => {
    // ФУНКЦИЯ отвечающая за отправку запроса
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
};

const getResourse = async (url) => {
    // ФУНКЦИЯ отвечающая за отправку запроса
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};

export {postData, getResourse};

