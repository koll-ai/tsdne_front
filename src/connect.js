export default function identify() {
    var id = prompt("Please enter your id");
    var mdp = prompt("Please enter your mdp");

    localStorage.setItem('id', id);
    localStorage.setItem('mdp', mdp);
}
