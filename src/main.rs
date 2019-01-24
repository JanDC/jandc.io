#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate rocket_contrib;


use std::collections::HashMap;

use rocket::Request;
use rocket_contrib::templates::Template;

#[derive(Serialize)]
struct TemplateContext {
    title: &'static str,
    pagetitle: &'static str,
    links: Vec<Link>,
}

#[derive(Serialize)]
struct Link {
    title: &'static str,
    url: &'static str,
    description: &'static str,
}


#[get("/")]
fn index() -> Template {
    let context = TemplateContext {
        title: "Jandc.io",
        pagetitle: "my stuff",
        links: vec![
            Link { title: "Critical css", url: "https://critical-css.jandc.io/", description: "PHP library to dynamicaly generate critical css" },
            Link { title: "Inspire", url: "https://inspire.jandc.io/", description: "Fun app to generate generic catchphrases" },
        ]
        ,
    };
    Template::render("index", &context)
}

#[catch(404)]
fn not_found(req: &Request) -> Template {
    let mut map = HashMap::new();
    map.insert("path", req.uri().path());
    map.insert("pagetitle", "Page not found");
    map.insert("title", "This page does not exist");
    Template::render("error/404", &map)
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/", routes![index])
        .attach(Template::fairing())
        .register(catchers![not_found])
}

fn main() {
    rocket().launch();
}
