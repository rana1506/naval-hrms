export const checkAccess = (resource, action) => {
  return (req, res, next) => {
    const role = req.user?.roles[0];
    if (!role) return res.status(403).json({ message: "No role assigned" });

    const permissions = req.app.locals.rbac[role] || [];
    const allowed = permissions.some(
      p => (p.resource === resource || p.resource === "*") &&
           (p.action === action || p.action === "*")
    );

    if (!allowed) return res.status(403).json({ message: "Access denied" });

    next();
  };
};