import keys from 'config/keys';

const getOptions = data => {
  return {
    method: 'POST',
    headers: {
      Authorization: 'Basic bm1kZXY6bm1kZXY=',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: { ...data } })
  };
};

export const getProblems = async (text, type, sources = []) => {
  const options = getOptions({ text, type, sources });

  try {
    let response = await fetch(`${keys.baseUrl}/get_problems`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    response = await response.json();

    if (response.data && response.data.data) return response.data.data;
  } catch (error) {
    console.error(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};

export const getWordSuggestions = async text => {
  const options = getOptions({ text });

  try {
    let response = await fetch(`${keys.baseUrl}/suggest_words`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    response = await response.json();

    return response.data;
  } catch (error) {
    console.error(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};

export const sendUserScore = async (stars, id) => {
  const options = getOptions({ action: 'rating', stars, id });

  try {
    let response = await fetch(`${keys.baseUrl}/get_user_action`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    response = await response.json();

    return response.data;
  } catch (error) {
    console.error(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};

export const addUserInput = async (type, text, link, problem) => {
  const options = getOptions({ action: 'add', type, text, link, problem });

  try {
    let response = await fetch(`${keys.baseUrl}/get_user_action`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    response = await response.json();

    return response.data;
  } catch (error) {
    console.error(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};

export const editProblem = async (text, id) => {
  const options = getOptions({ action: 'edit', text, id });

  try {
    let response = await fetch(`${keys.baseUrl}/get_user_action`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    response = await response.json();

    return response.data;
  } catch (error) {
    console.error(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};
