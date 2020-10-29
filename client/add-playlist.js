

const playlist = document.querySelector('.todo_list');
const button = document.querySelector('.todo_list button');
const input = document.querySelector('.todo_list input[type="text"]');
const list = document.querySelector('.todo_list ul');

button.addEventListener('click', () => {
  if (input.value === '') {
    const div = document.createElement('div');
    div.classList.add('alert', 'alert-warning', 'animated', 'bounceIn');
    div.appendChild(document.createTextNode('Ooops! There is nothing to add.'));

    playlist.insertBefore(div, list);

    setTimeout(() => {
      div.remove();
    }, 3000);

  } else {
    // add playlist to database

    const li = document.createElement('li');
    const span = document.createElement('span');
    const div = document.createElement('div');

    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center',);
    span.classList.add('badge', 'badge-primary', 'badge-pill');
    div.classList.add('alert', 'alert-success');

    li.appendChild(document.createTextNode(input.value));
    span.appendChild(document.createTextNode('x'));
    div.appendChild(document.createTextNode('Playlist added successfully!'));

    li.appendChild(span);
    list.appendChild(li);

    playlist.insertBefore(div, list);

    setTimeout(() => {
      div.remove();
    }, 3000);

    input.value = '';
  }
});

// delete playlist
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('badge') &&
    confirm('Are you sure?') === true) {
    e.target.parentElement.remove();

    const div = document.createElement('div');
    div.classList.add('alert', 'alert-success');
    div.appendChild(document.createTextNode('Playlist removed successfully!'));
    playlist.insertBefore(div, list);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }
});