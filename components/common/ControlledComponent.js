export default function ControlledComponent({ children, controller }) {
  if (Boolean(controller) === true) {
    return children;
  }
  return null;
}
