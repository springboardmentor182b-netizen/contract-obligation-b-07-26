function NotificationAvatar({ icon: Icon, color }) {
  return (
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "18px",
        background: `${color}15`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        size={24}
        color={color}
      />
    </div>
  );
}

export default NotificationAvatar;