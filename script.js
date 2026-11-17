
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const themeBtn = document.getElementById("themeBtn");

  function aplicarTema(tema) {
    const claro = tema === "light";
    document.body.classList.toggle("light", claro);

    if (themeBtn) {
      themeBtn.textContent = claro ? "🌙" : "☀️";
      themeBtn.setAttribute(
        "aria-label",
        claro ? "Activar modo oscuro" : "Activar modo claro"
      );
    }
  }

  let tema = "dark";

  try {
    tema = localStorage.getItem("temaDavid") || "dark";
  } catch (error) {
    tema = "dark";
  }

  aplicarTema(tema);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const nuevo = document.body.classList.contains("light")
        ? "dark"
        : "light";

      aplicarTema(nuevo);

      try {
        localStorage.setItem("temaDavid", nuevo);
      } catch (error) {}
    });
  }

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      const abierto = navLinks.classList.toggle("open");
      menuBtn.textContent = abierto ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", String(abierto));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === paginaActual) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const botones = document.querySelectorAll(".filter-btn");
  const proyectos = document.querySelectorAll(".project-card");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const filtro = boton.dataset.filter;

      botones.forEach(function (elemento) {
        elemento.classList.remove("active");
      });

      boton.classList.add("active");

      proyectos.forEach(function (proyecto) {
        const categoria = proyecto.dataset.category;
        const mostrar = filtro === "todos" || categoria === filtro;

        proyecto.style.display = mostrar ? "flex" : "none";
      });
    });
  });

  const elementos = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elementos.forEach(function (elemento) {
      observador.observe(elemento);
    });
  } else {
    elementos.forEach(function (elemento) {
      elemento.classList.add("visible");
    });
  }
});
