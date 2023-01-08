function getInitials(fullName) {
  const words = fullName.split(' ');

  const initialsString = words.map((word) => word[0]).join(' ');

  return initialsString;
}
