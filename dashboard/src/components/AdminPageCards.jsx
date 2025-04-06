function AdminPageCards({
  value,
  label,
  bgColor,
  iconBgColor,
  batch,
  logo: Logo,
}) {
  return (
    <div
      className={`w-full sm:w-[20rem] lg:w-[18rem] h-24 rounded-xl flex justify-between items-center p-4 sm:p-6 ${bgColor}`}
    >
      <div>
        <h1 className="">{batch}</h1>
        <h1 className="font-bold  text-lg sm:text-xl lg:text-2xl">{value}</h1>
        <span className="text-sm  sm:text-base lg:text-lg">{label}</span>
      </div>

      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex justify-center items-center rounded-full ${iconBgColor}`}
      >
        {/* Render the logo component */}
        {Logo && <Logo className="text-white text-lg sm:text-xl lg:text-2xl" />}
      </div>
    </div>
  );
}

export default AdminPageCards;
