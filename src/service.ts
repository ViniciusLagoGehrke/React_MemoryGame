const getRandomArbitrary: (min: number, max: number) => number = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const shuffle: (a: number[]) => number[] = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]]
  }

  return a
}

export const generateCards: (gridSize: number) => number[] = (gridSize) => {
  const imageIds: number[] = []

  do {
    const randomNumber = getRandomArbitrary(1, 200)

    if (!imageIds.includes(randomNumber)) {
      imageIds.push(randomNumber)
      imageIds.push(randomNumber)
    }
  } while (imageIds.length < (gridSize * gridSize))

  return shuffle(imageIds)
}

export const fetch = async (url: string, payload: number): Promise<Response> => {
  if (url !== '/api/v2/imageIds') {
    throw new Error('RESOURCE DOES NOT EXIST')
  }

  return await new Promise((resolve) => {
    // const max = 1; //defaul max random value = 1;
    // const min = 0.4; //sets min random value = 0.4 (decreases # times server errors);
    const ok: boolean = true // No server error
    // const ok = Boolean(Math.round(Math.random() * (max - min) + min));
    const init = { status: ok ? 200 : 500 }
    const body = ok ? generateCards(payload) : undefined

    const myResponse = new Response(new Blob([JSON.stringify(body)], { type: 'application/json' }), init)
    resolve(myResponse)
  })
}
