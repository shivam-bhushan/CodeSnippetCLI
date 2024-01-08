class Snippet {
  constructor(id, content, label, timestamp) {
    this.id = id;
    this.content = content;
    this.label = label;
    this.timestamp = timestamp || new Date().toISOString(); // Fix typo here
  }
}

export default Snippet; // Assuming you want Snippet to be the default export
