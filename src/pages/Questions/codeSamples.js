export const codeSample1 = `
  export const App = () => (
    <Highlight
      theme={themes.shadesOfPurple}
      code={codeBlock}
      language="tsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, overflowX: 'auto' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({
                    token,
                    style: {
                      ...getTokenProps({ token }).style,
                      maxHeight: '300px',
                      overflowY: 'auto',
                    },
                  })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );`

export const codeSample2 = `
  app.get("/campus/:id/locations", async (req, res) => {
    const reactComponent = renderToString(<SchoolPage />);
    const filePath = path.join(__dirname, "dist", "school-page.ejs");
    ejs.renderFile(filePath, { reactComponent }, (err, html) => {
      if (err) {
        console.error("Error rendering template:", err);
        return res.status(500).end();
      }
      res.send(html);
    });
  });`


export const codeSample3 = `
    addRowButton.addEventListener('click', () => {
        addRow();
        addRowButton.disabled = true;
    })
    
    inputArticle.classList.remove("hidden");
    outputArticle.classList.add("hidden");
    submitButton.addEventListener('click', submit);`
