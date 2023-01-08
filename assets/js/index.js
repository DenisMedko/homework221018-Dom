const {
  USER_DATA: { DEFAULT_NAME, DESCRIPTION }, SOC_NETWORKS_MAP,
} = CONSTANTS;

const userCards = responseData.map((userData) => createUserCard(userData));

const workersList = document.querySelector('#root');

workersList.append(...userCards);
/**
 *
 * @param {object} user
 * @returns {HTMLElement}
 */
function createUserCard(user) {
  const { firstName, lastName, profilePicture, contacts } = user;

  const fullName =
    !firstName && !lastName ? DEFAULT_NAME : `${firstName} ${lastName}`;

  const imgWrapper = createImage({
    fullName,
    profilePicture,
  });

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('cardInfo');

  const cardName = document.createElement('h1');
  cardName.classList.add('cardName');

  cardName.textContent = fullName;

  const cardDescription = document.createElement('p');
  cardDescription.classList.add('cardDescription');
  cardDescription.textContent = DESCRIPTION;

  cardInfo.append(cardName, cardDescription);
  
  linksList = createLinksList(contacts);

  linksContainer = document.createElement('section');
  linksContainer.classList.add('linksContainer');
  linksContainer.append(linksList);

  const article = createElement(
    'article',
    { className: 'workerCard' },
    imgWrapper,
    cardInfo,
    linksContainer
  );

  return createElement('li', { className: 'workerItem' }, article);
}

function createImage(data) {
  const { fullName, profilePicture } = data;

  const initialsText =
    fullName === DEFAULT_NAME ? fullName : getInitials(fullName);
  const initials = createElement('p', { className: 'initials' }, initialsText);

  const img = createElement('img', {
    className: 'cardImg',
    eventListeners: {
      error: deleteHandler,
    },
    attributes: {
      alt: fullName,
      src: profilePicture,
    },
  });

  return createElement('div', { className: 'imgWrapper' }, initials, img);
}

function deleteHandler(e) {
  e.target.remove();
}

/**
 * Создает HTML и настраивает Ээемент
 * @param {string} tagName тег создаваемого элемента
 * @param {object} options обьект настроек для элемента
 * @param {string} options.className классы для элемента
 * @param {object} options.eventListeners обьект с функциями - слушателями
 * @param {object} options.attributes обьект атрибутами
 * @param  {...(Element | Node | string)} children - дочерние элементы, узлы или текст
 * @returns {HTMLElement}
 */
function createElement(tagName, options = {}, ...children) {
  const { className, eventListeners = {}, attributes = {} } = options;

  const elem = document.createElement(tagName);

  elem.className = className;

  for (const [eventType, listener] of Object.entries(eventListeners)) {
    elem.addEventListener(eventType, listener);
  }

  for (const [attrName, value] of Object.entries(attributes)) {
    elem.setAttribute(attrName, value);
  }

  elem.append(...children);

  return elem;
}

function createLinksList(contacts) {
  const linksItems = contacts.map((contact) => {
    const url = new URL(contact);
    const hostName = url.hostname;
    const src = `./assets/images/${SOC_NETWORKS_MAP.get(hostName)}`;
    const img = createElement('img' , 
      { className: 'linksImg' ,
        eventListeners: {
          error: deleteHandler,
        },
        attributes: {
          alt: hostName,
          src: src,
        }
      });
    const link = createElement('a',
    { className: 'link' ,
        eventListeners: {},
        attributes: {
          href: contact,
        }
      });
    link.append(img);
    const linksItem = document.createElement('li');
    linksItem.classList.add('linksItem');
    linksItem.append(link);
    return linksItem;
  });
  
  return createElement('ul', { className: 'linksItems' }, ...linksItems);
}
