const VideoShowcaseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-foreground mb-4">
            Видео о наших <span className="text-primary">прицепах</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Смотрите обзоры, тест-драйвы и короткие ролики о продукции СКИФ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Horizontal video (16:9) */}
          <div className="lg:col-span-2">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-black" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://vk.com/video_ext.php?oid=-213382481&id=456239155&hd=2"
                title="Обзор прицепа СКИФ"
                frameBorder={0}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>

          {/* Vertical video (9:16) */}
          <div className="lg:col-span-1 mx-auto w-full max-w-[360px] lg:max-w-none">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg bg-black" style={{ paddingTop: "177.78%" }}>
              <iframe
                src="https://vk.com/video_ext.php?oid=-213382481&id=456239168&hd=2"
                title="Короткое видео о прицепе СКИФ"
                frameBorder={0}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
